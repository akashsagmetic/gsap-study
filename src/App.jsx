import CinematicGallery from "./components/CinematicGallery"
import Editorial from "./components/Editorial"
import InteractiveStage from "./components/InteractiveStage"


import ProjectGrid from "./components/ProjectGrid"
import SiteFooter from "./components/SiteFooter"
import StudioStatement from "./components/StudioStatement"

function App() {
  return (
    <>
      <Editorial />
    <InteractiveStage/>
      <CinematicGallery />
      <ProjectGrid />
      <StudioStatement />
      <SiteFooter />
    </>
  )
}

export default App
