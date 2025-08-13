export function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function getServiceSlug(title) {
    // Extract main service name from title (before the colon)
    const mainTitle = title.split(':')[0].trim();
    return slugify(mainTitle);
}