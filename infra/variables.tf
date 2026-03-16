variable "atlas_org_id" {
  description = "MongoDB Atlas organization ID."
  type        = string
}

variable "atlas_project_name" {
  description = "MongoDB Atlas project name."
  type        = string
}

variable "atlas_cluster_name" {
  description = "MongoDB Atlas cluster name."
  type        = string
}

variable "atlas_region" {
  description = "MongoDB Atlas region for the M0 cluster."
  type        = string
  default     = "US_EAST_1"
}

variable "atlas_ip_access_cidr" {
  description = "CIDR block allowed to access the Atlas project."
  type        = string
}
