import { useStore } from "./hooks/useStore"
import { useKeyboard } from "./hooks/useKeyboard"
import { dirtImg, grassImg, glassImg, woodImg, logImg } from "../../shared/images/images"

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg
}

export const TextureSelector = () => {
    const [texture, setTexture] = useStore((state) => [state.texture, state.setTexture])

    useKeyboard()

    return (
        <div className="absolute centered texture-selector">
            {Object.entries(images).map(([imgKey, img]) => {
                return (
                    <img
                        key={imgKey}
                        src={img}
                        alt={imgKey}
                        className={`texture-selector ${texture === imgKey + 'Texture' ? 'selected' : ''}`}
                        onClick={() => setTexture(imgKey + 'Texture')}
                    />
                )
            })}
        </div>
    )
}