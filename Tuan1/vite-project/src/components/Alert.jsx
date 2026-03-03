import './Alert.css'

const icons = {
  success: '✅',
  warning: '⚠️',
  error: '❌',
}

const messages = {
  success: 'Thao tác thành công!',
  warning: 'Hãy kiểm tra lại thông tin.',
  error: 'Đã xảy ra lỗi, vui lòng thử lại.',
}

function Alert({ type }) {
  if (!type) return null

  return (
    <div className={`alert alert--${type}`}>
      <span className="alert__icon">{icons[type]}</span>
      <span className="alert__message">{messages[type]}</span>
    </div>
  )
}

export default Alert
