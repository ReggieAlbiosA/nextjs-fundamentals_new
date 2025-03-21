export default async function Page({ params }: { params: Promise<{  colorCode: string }> }) {
    const { colorCode } = await params;

    return (
        <h1>Color Code: #{colorCode}</h1>
    );
}