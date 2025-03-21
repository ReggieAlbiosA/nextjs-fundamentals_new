import CreateTributeForm from "@/components/tribute-post_components/CreateTributePostForm";

export default function Page(){
    return (
        <>
            <style>
                {`
                body{
                    padding: 0px !important;
                }
                `}
            </style>
            
            <section>
                <CreateTributeForm />
            </section>
        </>
    );
}