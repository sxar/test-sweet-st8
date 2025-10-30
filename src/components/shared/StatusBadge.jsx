import classNames from 'classnames'

export function StatusBadge({ status, testId }) {
  return (
    <div
      className={classNames('status-badge', `status-${status}`)}
      data-testid={testId}
    >
      Status: {status}
    </div>
  )
}
