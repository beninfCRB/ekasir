export type TableType = {
  data: any[] | []
  onDelete: (v: any) => void
  onView: (v: any) => void
  loading: boolean
}