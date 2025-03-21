

function convertToTitleCase(str: string) {
    return str
      .replace("-", " & ").replace(/-/g, " ")// Replace hyphens with spaces
      .replace(/\b\w/g, (char: string) => char.toUpperCase()); // Capitalize each word
  }
  
export default async function Page({ params }: { params: Promise<{ nav: string }> }) {

    const { nav } = await params;

    return (
        <h1>This is {convertToTitleCase(nav)} page</h1>
    );
}