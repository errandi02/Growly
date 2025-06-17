import HabilidadFiller from "./HabilidadFiller"
import HomeHeader from "../Home/HomeHeader";

export default function Habilidad() {
  return (
    <div>
        <HomeHeader />
        <div className="bg-gradient-to-b from-[#f1fff4] to-[#white]">
            <HabilidadFiller />
        </div>
    </div>
  )
}
