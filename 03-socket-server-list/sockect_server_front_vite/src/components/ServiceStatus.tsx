import type React from "react"

interface ServiceStatusProps {
  isOnline: boolean
  isConnecting?: boolean
}

export const ServiceStatus: React.FC<ServiceStatusProps> = ({ 
  isOnline, 
  isConnecting = false 
}) => {
  const getStatusConfig = () => {
    if (isConnecting) {
      return {
        badgeClass: "bg-warning",
        icon: "bi-arrow-clockwise",
        text: "Conectando...",
        iconClass: "spinning"
      }
    }
    return {
      badgeClass: isOnline ? "bg-success" : "bg-danger",
      icon: isOnline ? "bi-wifi" : "bi-wifi-off",
      text: isOnline ? "Online" : "Offline",
      iconClass: ""
    }
  }

  const status = getStatusConfig()

  return (
    <>
      <div className="d-flex align-items-center">
        <span className="text-white-50 me-2 small">Estado del servicio:</span>
        <span className={`badge ${status.badgeClass} d-flex align-items-center`}>
          <i className={`bi ${status.icon} me-1 ${status.iconClass}`}></i>
          {status.text}
        </span>
      </div>
    </>
  )
}

export default ServiceStatus