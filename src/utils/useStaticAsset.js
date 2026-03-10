export const useStaticAsset = (file) => {
    const host = import.meta.env.VITE_CDN_HOST
    return host + "/" + file
}