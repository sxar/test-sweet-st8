export function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="loading-spinner">
      <div className="spinner-icon">⏳</div>
      <span>{text}</span>
    </div>
  )
}
