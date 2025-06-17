import AddExperiencePage from "./ExperienciaFiller"
import HomeHeader from "../Home/HomeHeader";

export default function Experiencia() {
  return (
    <div>
        <HomeHeader />
        <div className="bg-gradient-to-b from-[#f1fff4] to-[#white]">
            <AddExperiencePage />
        </div>
    </div>
  )
}
