function useTableContent() {
  const tableContentRef = ref()

  const handleClickSearch = (searchForm: any) => {
    console.log(searchForm)
    tableContentRef.value?.fetchPageListData(searchForm)
  }
  const handleClickReset = (searchForm: any) => {
    tableContentRef.value?.fetchPageListData(searchForm)
  }
  return {
    tableContentRef,
    handleClickReset,
    handleClickSearch
  }
}
export default useTableContent
