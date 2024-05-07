import {useRef} from 'react'

type Props = {
    url?: string,
    level?: number,
    containerClassName?: string,
    imageClassName?: string,
}

const levelClassName = (level: number) => {
    switch (level) {
        case 1.5:
            return 'hover:scale-[1.5]';
        case 2:
            return 'hover:scale-[2]';
        case 2.5:
            return 'hover:scale-[2.5]';
        case 3:
            return 'hover:scale-[3]';
        default:
            return 'hover:scale-[3]';
    }
}

export function ImageZoom({
                              url = 'https://picsum.photos/id/678/2000/1400',
                              level = 3,
                              containerClassName = '',
                              imageClassName = '',
                          }: Props) {
    // Create a ref for the image element
    const imageRef: React.RefObject<HTMLImageElement> = useRef(null);

    // handleMouseMove is a function to update the zoom origin based on mouse position
    const handleMouseMove = (event: React.MouseEvent) => {
        if (imageRef.current) {
            // Get the bounding rectangle of the image directly from the ref
            const {left, top, width, height} =
                imageRef.current.getBoundingClientRect();

            // Calculate the percentage position of the cursor over the image
            const x = ((event.clientX - left) / width) * 100;
            const y = ((event.clientY - top) / height) * 100;

            // Directly update the style of the image to adjust the transform origin
            imageRef.current.style.transformOrigin = `${x}% ${y}%`;
        }

        return event;
    };

    return (
        <div className={`image-zoom-container overflow-hidden cursor-zoom-in ${containerClassName}`}>
            <img
                ref={imageRef}
                src={url}
                // Tailwind can't handle string concatenation, so use a function
                // https://v2.tailwindcss.com/docs/just-in-time-mode
                className={`w-full h-full transition-transform duration-300 ${levelClassName(level)} ${imageClassName}`}
                alt="Zoomable"
                onMouseMove={handleMouseMove}
            />
        </div>
    );
};
