export default function ImageContainer({image}) {
    return (
        <div className="img-container">
            <img src={image} alt="image from the marker" width="220px" />
        </div>
    );
};