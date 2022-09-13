const AlertMessage = ({ info }) => {
  if (info) {
    if (info.type === 'danger') {
      return (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          {info.message}
        </div>
      )
    }
  } else {
    return null;
  }
}

export default AlertMessage
