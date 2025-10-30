import classNames from 'classnames'

export function DisplayCard({
  title,
  children,
  className,
  highlight = false
}) {
  return (
    <div className={classNames(
      'display-card',
      { 'highlight': highlight },
      className
    )}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  )
}
