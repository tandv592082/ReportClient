"use strict";(self["webpackChunkwork"]=self["webpackChunkwork"]||[]).push([[848],{7848:function(t,e,n){n.r(e),n.d(e,{default:function(){return h}});var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.data?n("v-card",[n("v-card-title",[t._v(" Bảng phân công trực nhật tuần "+t._s(t.weekNumber)+" ("+t._s(t.weekStart)+" - "+t._s(t.weekEnd)+")")]),n("v-data-table",{staticClass:"elevation-1",attrs:{"item-key":"id",items:t.works,headers:t.headers,loading:t.loading,"loading-text":"Đang tải dữ liệu bảng trực nhật...","hide-default-footer":""},scopedSlots:t._u([{key:"item.votes",fn:function(e){var r=e.item;return[n("v-chip",{attrs:{color:t.getVoteColor(r.votes),dark:""}},[t._v(" "+t._s(r.isWorkNotOpening?r.votes:"Đang chờ")+" ")])]}},{key:"item.isWorkNotOpening",fn:function(e){var r=e.item;return[n("v-chip",{attrs:{color:t.getStatusColor(r.isWorkNotOpening),dark:""}},[t._v(" "+t._s(r.isWorkNotOpening?"Đã hoàn thành":"Chưa hoàn thành")+" ")])]}}])})],1):n("h1",[t._v("Không có dữ liệu tuần này!")])],1)},a=[],o=n(1428),i=n(6838),s=n(1709),l={name:"DashBoardPage",data(){return{data:!0,loading:!1,works:[],weekStart:(0,s.To)()[0],weekEnd:(0,s.To)()[1],weekNumber:(0,s.s)(),headers:[{text:"Thứ",align:"start",value:"day"},{text:"Ngày trực nhật",align:"start",value:"date"},{text:"Học sinh",align:"start",value:"users"},{text:"Ghi chú",align:"start",value:"description"},{text:"Giờ mở đánh giá",align:"start",value:"expires"},{text:"Đánh giá",align:"start",value:"votes"},{text:"Trạng thái",align:"start",value:"isWorkNotOpening"}]}},filters:{date:t=>t.split("-").reverse().join("/")},async created(){await this.getAllWorks()},methods:{getVoteColor(t){return"Đang chờ"===t?"orange":"green"},getStatusColor(t){return t?"green":"orange"},async getAllWorks(){try{this.loading=!0;const t=await(0,o.ib)(),{data:e}=t;this.works=(0,i.cE)(e),console.log(this.works)}catch(t){console.log(t)}finally{this.loading=!1}}}},u=l,c=n(1001),g=(0,c.Z)(u,r,a,!1,null,null,null),h=g.exports},1428:function(t,e,n){n.d(e,{Js:function(){return i},UU:function(){return a},ib:function(){return o}});var r=n(5972);function a(t){return(0,r.Z)({url:"/v1/works",method:"post",data:t})}function o(){return(0,r.Z)({url:"/v1/works",method:"get"})}function i(t){return(0,r.Z)({url:`/v1/works/${t}`,method:"delete"})}}}]);
//# sourceMappingURL=848.5faf6051.js.map