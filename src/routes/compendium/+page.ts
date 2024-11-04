export const load = async ({ fetch }) => {
    const response = await fetch(`/api/pages`);
    const pages = await response.json();

    return {
        pages
    };
};