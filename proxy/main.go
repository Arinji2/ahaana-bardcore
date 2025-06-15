package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	_ "github.com/joho/godotenv/autoload"
)

func driveProxyHandler(w http.ResponseWriter, r *http.Request) {
	referer := r.Header.Get("Referer")
	allowedOrigin := os.Getenv("FRONTEND_URL")

	if referer == "" || !strings.HasPrefix(referer, allowedOrigin) {
		http.Error(w, "Forbidden: invalid referer", http.StatusForbidden)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	fileID := r.URL.Query().Get("fileID")
	if fileID == "" {
		http.Error(w, "fileID parameter is required", http.StatusBadRequest)
		return
	}

	client := &http.Client{
		Timeout: 30 * time.Second,
		CheckRedirect: func(req *http.Request, via []*http.Request) error {
			if len(via) >= 5 {
				return fmt.Errorf("too many redirects")
			}
			return nil
		},
	}

	driveURL := fmt.Sprintf("https://drive.google.com/uc?export=download&id=%s", fileID)
	req, err := http.NewRequest("GET", driveURL, nil)
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	req.Header.Set("User-Agent", "Mozilla/5.0 (compatible; Go-Proxy/1.0)")

	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Failed to fetch file from Google Drive", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		http.Error(w, fmt.Sprintf("Google Drive returned status %d", resp.StatusCode), resp.StatusCode)
		return
	}

	w.Header().Set("Content-Type", getContentType(resp.Header.Get("Content-Type")))
	w.Header().Set("Cache-Control", "public, max-age=86400")

	if contentLength := resp.Header.Get("Content-Length"); contentLength != "" {
		w.Header().Set("Content-Length", contentLength)
	}

	if acceptRanges := resp.Header.Get("Accept-Ranges"); acceptRanges != "" {
		w.Header().Set("Accept-Ranges", acceptRanges)
	}

	_, err = io.Copy(w, resp.Body)
	if err != nil {
		log.Printf("Error streaming response: %v", err)
	}
}

func getContentType(driveContentType string) string {
	if driveContentType != "" {
		return driveContentType
	}
	return "audio/mpeg"
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("OK"))
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	allowedOrigin := os.Getenv("FRONTEND_URL")
	if allowedOrigin == "" {
		allowedOrigin = "http://localhost:3000"
		fmt.Println("No allowed origin specified, defaulting to", allowedOrigin)
	} else {
		fmt.Println("Allowed origin:", allowedOrigin)
	}

	http.HandleFunc("/proxy", driveProxyHandler)
	http.HandleFunc("/health", healthHandler)

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
