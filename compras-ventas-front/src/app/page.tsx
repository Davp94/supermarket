import Image from "next/image";
import { Button } from 'primereact/button';
export default function Home() {
  //TODO remove page from root 
  return (
    <div className="text-lg">
      HELLO FROM HOME
       <div className="card flex justify-center">
            <Button label="Check" icon="pi pi-check" />
        </div>
    </div>
    
  );
}
