import {
    A as w,
    B as _,
    M as y,
    P as C,
    T as f,
    c as h,
    ee as k,
    ga as l,
    ja as V,
    p as v,
    pa as U,
    q as $,
    ta as T,
    w as u
} from "./chunk-7LZCJGQ2.js";
var g = 100 * 1024 * 1024;

function W(o) {
    return new Promise((r, B) => {
        let t = URL.createObjectURL(o),
            e = document.createElement("video");
        e.preload = "metadata", e.onloadedmetadata = () => {
            URL.revokeObjectURL(t);
            let s = e.duration;
            Number.isFinite(s) && s >= 0 ? r(s) : B(new Error("Could not read video duration"))
        }, e.onerror = () => {
            URL.revokeObjectURL(t), B(new Error("Failed to load video for duration"))
        }, e.src = t
    })
}
var H = (() => {
    let r = class r {
        constructor(t) {
            this._http = t, this.base = "/api/studio/videos", this.meBase = "/api/studio/me/videos", this.meRoot = "/api/studio/me", this.publicBase = "/api/studio/public/videos", this.adminBase = "/api/admin/studio/videos", this.adminCategoriesBase = "/api/admin/studio/categories", this.adminPlaylistsBase = "/api/admin/studio/playlists", this.adminFeaturedBase = "/api/admin/studio/featured-carousel", this.statsBase = "/api/admin/studio/stats"
        }
        getVideos() {
            return this._http.get(this.adminBase)
        }
        getVideo(t) {
            return this._http.get(`${this.adminBase}/${t}`)
        }
        getSavedVideoIds() {
            return this._http.get(`${this.base}/saved-ids`)
        }
        getSavedVideos() {
            return this._http.get(`${this.base}/saved`)
        }
        getContinueWatching() {
            return this._http.get(`${this.base}/continue-watching`)
        }
        getLastWatchPosition(t) {
            return this._http.get(`${this.base}/${t}/last-watch-position`)
        }
        saveVideo(t) {
            return this._http.post(`${this.base}/${t}/save`, {}, {
                responseType: "text"
            })
        }
        unsaveVideo(t) {
            return this._http.delete(`${this.base}/${t}/save`, {
                responseType: "text"
            })
        }
        markWatched(t) {
            return this._http.post(`${this.meBase}/${t}/watched`, {}).pipe(u(e => ({
                watchedAt: new Date(e.watchedAt)
            })))
        }
        markUnwatched(t) {
            return this._http.delete(`${this.meBase}/${t}/watched`)
        }
        getRecentlyAdded(t = 10) {
            return this._http.get(`${this.publicBase}/recently-added`, {
                params: {
                    limit: t
                }
            })
        }
        getWatchedHistory(t = 50, e = 0) {
            return this._http.get(`${this.meBase}/watched-history`, {
                params: {
                    limit: t,
                    offset: e
                }
            })
        }
        getStudioHasNew() {
            return this._http.get(`${this.meRoot}/studio-has-new`)
        }
        markStudioVisit() {
            return this._http.post(`${this.meRoot}/studio-visit`, {})
        }
        startVideoTracking(t, e) {
            return this._http.post(`${this.base}/${t}/tracking/start`, e ? ? {})
        }
        endVideoTracking(t, e) {
            return this._http.patch(`${this.base}/tracking/${t}/end`, e ? ? {}, {
                responseType: "text"
            })
        }
        updateVideoProgress(t, e) {
            return this._http.patch(`${this.base}/tracking/${t}/progress`, e, {
                responseType: "text"
            })
        }
        getStudioStatsMonthlyTime() {
            return this._http.get(`${this.statsBase}/monthly-time`)
        }
        getStudioStatsBreakdown(t, e) {
            return this._http.get(`${this.statsBase}/breakdown`, {
                params: {
                    from: t,
                    to: e
                }
            })
        }
        getStudioStatsByVideo(t, e) {
            return this._http.get(`${this.statsBase}/by-video`, {
                params: {
                    from: t,
                    to: e
                }
            })
        }
        createVideo(t) {
            return this._http.post(this.adminBase, t)
        }
        updateVideo(t, e) {
            return this._http.patch(`${this.adminBase}/${t}`, e)
        }
        deleteVideo(t) {
            return this._http.delete(`${this.adminBase}/${t}`, {
                responseType: "text"
            })
        }
        uploadCaption(t, e, s, i) {
            let a = new FormData;
            return a.append("file", e), a.append("lang", s), a.append("label", i), this._http.post(`${this.adminBase}/${t}/captions`, a)
        }
        deleteCaption(t, e) {
            return this._http.delete(`${this.adminBase}/${t}/captions/${e}`)
        }
        getPresignedUploadUrl(t, e, s) {
            return this._http.post(`${this.adminBase}/${t}/presigned-upload`, {
                type: e,
                contentType: s
            })
        }
        uploadToPresignedUrl(t, e) {
            return new h(s => {
                fetch(t, {
                    method: "PUT",
                    body: e,
                    headers: {
                        "Content-Type": e.type
                    }
                }).then(i => {
                    if (!i.ok) throw new Error(`Upload failed: ${i.status}`);
                    s.next(void 0), s.complete()
                }).catch(i => s.error(i))
            })
        }
        uploadToPresignedUrlWithProgress(t, e) {
            return new h(s => {
                let i = new XMLHttpRequest;
                return i.upload.addEventListener("progress", a => {
                    if (a.lengthComputable) {
                        let d = Math.round(100 * a.loaded / a.total);
                        s.next(d)
                    }
                }), i.addEventListener("load", () => {
                    i.status >= 200 && i.status < 300 ? (s.next(100), s.complete()) : s.error(new Error(`Upload failed: ${i.status}`))
                }), i.addEventListener("error", () => s.error(new Error("Upload failed"))), i.addEventListener("abort", () => s.complete()), i.open("PUT", t), i.setRequestHeader("Content-Type", e.type), i.send(e), () => i.abort()
            })
        }
        startTranscode(t) {
            return this._http.post(`${this.adminBase}/${t}/start-transcode`, {})
        }
        initiateMultipartUpload(t) {
            return this._http.post(`${this.adminBase}/${t}/multipart/initiate`, {})
        }
        getMultipartPartUrl(t, e) {
            return this._http.post(`${this.adminBase}/${t}/multipart/part-url`, e)
        }
        completeMultipartUpload(t, e) {
            return this._http.post(`${this.adminBase}/${t}/multipart/complete`, e, {
                responseType: "text"
            })
        }
        abortMultipartUpload(t, e) {
            return this._http.post(`${this.adminBase}/${t}/multipart/abort`, e, {
                responseType: "text"
            })
        }
        _uploadPart(t, e) {
            return new h(s => {
                let i = new XMLHttpRequest;
                return i.addEventListener("load", () => {
                    if (i.status >= 200 && i.status < 300) {
                        let a = i.getResponseHeader("ETag");
                        if (!a) {
                            s.error(new Error("S3 did not return an ETag for this part"));
                            return
                        }
                        s.next(a), s.complete()
                    } else s.error(new Error(`Part upload failed: ${i.status}`))
                }), i.addEventListener("error", () => s.error(new Error("Part upload network error"))), i.open("PUT", t), i.send(e), () => i.abort()
            })
        }
        uploadVideoMultipart(t, e) {
            let s = Math.ceil(e.size / g),
                i, a, d = [];
            return this.initiateMultipartUpload(t).pipe(l(n => {
                i = n.uploadId, a = n.key;
                let c = Array.from({
                    length: s
                }, (M, b) => {
                    let m = b + 1,
                        P = b * g,
                        E = Math.min(P + g, e.size),
                        x = e.slice(P, E);
                    return _(() => this.getMultipartPartUrl(t, {
                        uploadId: i,
                        key: a,
                        partNumber: m
                    }).pipe(l(({
                        url: p
                    }) => this._uploadPart(p, x)), V(p => {
                        d.push({
                            partNumber: m,
                            etag: p
                        })
                    }), u(() => {
                        let p = Math.min(m * g, e.size);
                        return Math.round(p / e.size * 100)
                    })))
                });
                return w(...c)
            }), C(_(() => this.completeMultipartUpload(t, {
                uploadId: i,
                key: a,
                parts: d
            }).pipe(f())))).pipe(y(n => i && a ? this.abortMultipartUpload(t, {
                uploadId: i,
                key: a
            }).pipe(y(c => (console.error("Failed to abort multipart upload:", c), v(void 0))), l(() => $(() => n))) : $(() => n)))
        }
        getCategories() {
            return this._http.get(this.adminCategoriesBase)
        }
        createCategory(t) {
            return this._http.post(this.adminCategoriesBase, {
                name: t
            })
        }
        getVideoCategories(t) {
            return this._http.get(`${this.adminBase}/${t}/categories`)
        }
        setVideoCategories(t, e) {
            return this._http.patch(`${this.adminBase}/${t}/categories`, {
                categoryIds: e
            })
        }
        getVideoTags(t) {
            return this._http.get(`${this.adminBase}/${t}/tags`)
        }
        setVideoTags(t, e) {
            return this._http.patch(`${this.adminBase}/${t}/tags`, {
                tagNames: e
            })
        }
        getVideoStocks(t) {
            return this._http.get(`${this.adminBase}/${t}/stocks`)
        }
        setVideoStocks(t, e) {
            return this._http.patch(`${this.adminBase}/${t}/stocks`, {
                stockSymbols: e
            })
        }
        getFeaturedCarousel() {
            return this._http.get("/api/studio/public/videos/featured-carousel")
        }
        getAdminFeaturedCarousel() {
            return this._http.get(this.adminFeaturedBase)
        }
        setFeaturedCarousel(t) {
            return this._http.put(this.adminFeaturedBase, {
                items: t
            })
        }
        getUpNext(t, e, s) {
            let i = {};
            return e && (i.context = e), s && (i.contextId = s), this._http.get(`/api/studio/public/videos/${t}/up-next`, {
                params: i
            })
        }
        getVideosByStock(t) {
            return this._http.get(`/api/studio/public/videos/by-stock/${t}`)
        }
        getFeaturedVideo() {
            return this._http.get("/api/studio/public/videos/featured")
        }
        getFeaturedVideoWithCategories() {
            return this._http.get("/api/studio/public/videos/featured-with-categories")
        }
        getRecentVideos(t = 4) {
            return this._http.get("/api/studio/public/videos/recent", {
                params: {
                    limit: String(t)
                }
            })
        }
        getRecentVideosWithCategories(t = 4) {
            return this._http.get("/api/studio/public/videos/recent-with-categories", {
                params: {
                    limit: String(t)
                }
            })
        }
        getPublicVideoWithCategories(t) {
            return this._http.get(`/api/studio/public/videos/${t}`)
        }
        getRelatedVideos(t, e = 4) {
            return this._http.get(`/api/studio/public/videos/${t}/related`, {
                params: {
                    limit: String(e)
                }
            })
        }
        getPublicCategories() {
            return this._http.get("/api/studio/public/categories")
        }
        getPublicCategory(t) {
            return this._http.get(`/api/studio/public/categories/${t}`)
        }
        getPublicVideosByCategory(t) {
            return this._http.get(`/api/studio/public/categories/${t}/videos`).pipe(u(e => e.videos))
        }
        getPublicVideosByCategoryPaginated(t, e = 8, s = 0, i = "newest") {
            return this._http.get(`/api/studio/public/categories/${t}/videos`, {
                params: {
                    limit: e.toString(),
                    offset: s.toString(),
                    sort: i
                }
            })
        }
        setCategoryVideoPositions(t, e) {
            return this._http.put(`${this.adminCategoriesBase}/${t}/video-positions`, {
                items: e
            })
        }
        getPublicTags() {
            return this._http.get("/api/studio/public/tags")
        }
        getPublicTag(t) {
            return this._http.get(`/api/studio/public/tags/${t}`)
        }
        getPublicVideosByTag(t) {
            return this._http.get(`/api/studio/public/tags/${t}/videos`)
        }
        importYouTube(t) {
            return this._http.post(`${this.adminBase}/import-youtube`, {
                url: t
            })
        }
        getPlaylists() {
            return this._http.get(this.adminPlaylistsBase)
        }
        createPlaylist(t) {
            return this._http.post(this.adminPlaylistsBase, t)
        }
        updatePlaylist(t, e) {
            return this._http.patch(`${this.adminPlaylistsBase}/${t}`, e)
        }
        deletePlaylist(t) {
            return this._http.delete(`${this.adminPlaylistsBase}/${t}`, {
                responseType: "text"
            })
        }
        getPlaylistVideos(t) {
            return this._http.get(`${this.adminPlaylistsBase}/${t}/videos`)
        }
        setPlaylistVideos(t, e) {
            return this._http.put(`${this.adminPlaylistsBase}/${t}/videos`, {
                items: e
            })
        }
        getPublicPlaylists() {
            return this._http.get("/api/studio/public/playlists")
        }
        getPublicPlaylist(t) {
            return this._http.get(`/api/studio/public/playlists/${t}`)
        }
        getCategoryPresignedUploadUrl(t, e) {
            return this._http.post(`${this.adminCategoriesBase}/${t}/presigned-upload`, {
                contentType: e
            })
        }
        updateCategory(t, e) {
            return this._http.patch(`${this.adminCategoriesBase}/${t}`, e)
        }
        deleteCategory(t) {
            return this._http.delete(`${this.adminCategoriesBase}/${t}`, {
                responseType: "text"
            })
        }
        bulkUpdateCategoryOrder(t) {
            return this._http.put(`${this.adminCategoriesBase}/bulk-order`, {
                items: t
            })
        }
    };
    r.\u0275fac = function(e) {
        return new(e || r)(T(k))
    }, r.\u0275prov = U({
        token: r,
        factory: r.\u0275fac,
        providedIn: "root"
    });
    let o = r;
    return o
})();
export {
    W as a, H as b
};