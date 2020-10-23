<template>
  <CCard style="text-align:center">
    <CCardHeader>
      <slot name="header">
        <b>Jobs List</b>
      </slot>
    </CCardHeader>
    <CCardBody>
      <CDataTable
        :hover="hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        items-per-page-select
        :items="items"
        :fields="fields"
        :items-per-page="10"
        :dark="dark"
        pagination
        border
        sorter
      >
        <template  #jobNo="{item}">
          <td class="pointer"  @click="ToJobDetail(item._id)"  style="text-align:center">
            {{item.jobNo}}
          </td>
        </template>
       
      </CDataTable>
    </CCardBody>
  </CCard>
</template>
<style scoped>
.pointer{
  cursor: pointer;
}
</style>
<script>
export default {
  name: 'Table',
  props: {
    items: Array,
    fields: {
      type: Array,
      default () {
        return ['jobNo', 'Date', 'Machine', 'StartDate', 'StartTime', 'EndDate', 'EndTime','Response',  'Status']
      }
    },
    caption: {
      type: String,
      default: 'Table'
    },
    hover: Boolean,
    striped: Boolean,
    bordered: Boolean,
    small: Boolean,
    fixed: Boolean,
    dark: Boolean
  },
  methods: {
    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    ToJobDetail(val){
      this.$router.push("/jobdetail/"+val);     
    },
  }
}
</script>
