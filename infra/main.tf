resource "mongodbatlas_project" "main" {
  name   = var.atlas_project_name
  org_id = var.atlas_org_id

  lifecycle {
    prevent_destroy = true
  }
}
