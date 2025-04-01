import '../../../public/styles/MarkerPrompt.css';

export default function MarkerPrompt({ 
    showAbove, 
    promptPosition, 
    onSave, 
    onCancel 
}) {
    return (
        <div 
            className={`marker-prompt ${showAbove ? 'above' : 'below'}`}
            style={{
                left: `${promptPosition.x}px`,
                top: `${promptPosition.y}px`,
                transform: showAbove ? 'translate(-50%, -100%)' : 'translate(-50%, 0)'
            }}
        >
            <p>Add marker here?</p>
            <div className="marker-prompt-buttons">
                <button onClick={onSave}>✓</button>
                <button onClick={onCancel}>✕</button>
            </div>
            <div 
                className="marker-prompt-arrow"
                style={{
                    top: showAbove ? '100%' : '-6px',
                    transform: showAbove ? 'none' : 'rotate(180deg)'
                }}
            />
        </div>
    );
} 