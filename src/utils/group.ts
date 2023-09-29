/**
 * 数据分组函数，传入父数据，子数据，对比字段
 * @param arrayFather
 * @constructor
 */
interface group {
  arrayFather: any //父组数据
  arrayChildren: any[] //子组数据
  foreignParentID: string //子组找父组的字段
  parentGroupID: string //父组找父组ID的字段
  parentID: string //父组ID
}
export const Grouping = (arrayFather: any[], arrayChildren: any[]) => {}
