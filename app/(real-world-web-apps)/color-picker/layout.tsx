import ColorPicker from "@/components/ColorPicker";
import { ColorCodeProvider } from "@/components/ColorCodeContext";
export default function Layout( { children }: { children: React.ReactNode } ) {
  
  return (
    <section className="min-h-screen flex flex-col items-center gap-y-[80px] ">  

        <ColorCodeProvider>
            <ColorPicker />
        </ColorCodeProvider>

        <div>
            {children}
        </div>
        
    </section>
  );
}