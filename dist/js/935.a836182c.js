"use strict";(self["webpackChunkwork"]=self["webpackChunkwork"]||[]).push([[935],{3283:function(t,e,a){a.r(e),a.d(e,{default:function(){return d}});var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.data?a("v-card",{staticClass:"p-2 pt-5"},[a("v-card-title",[t._v(" Bảng thống kê học sinh trực nhật ")]),a("v-data-table",{staticClass:"elevation-1",attrs:{"item-key":"id",items:t.rangeUserData,headers:t.headers,loading:t.loading,"loading-text":"Đang tải dữ liệu bảng trực nhật...","hide-default-footer":""},scopedSlots:t._u([{key:"item.votes",fn:function(e){var n=e.item;return[a("v-chip",{attrs:{color:t.getVoteColor(n.votes),dark:""}},[t._v(" "+t._s(n.votes)+" ")])]}},{key:"item.status",fn:function(e){var n=e.item;return[a("v-chip",{attrs:{color:t.getStatusColor(n.status),dark:""}},[t._v(" "+t._s(n.status)+" ")])]}}])})],1):a("h1",[t._v("Không có dữ liệu tuần này!")])],1)},r=[],s=a(9023),o=a(6838),i={name:"AnalyticsPage",data(){return{data:!0,loading:!1,dateStart:new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toISOString().substr(0,10),dateEnd:new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toISOString().substr(0,10),menu:!1,modal:!1,userData:[],rangeUserData:[],menu2:!1,menu1:!1,headers:[{text:"Họ và tên",align:"start",value:"name"},{text:"Ngày sinh",align:"start",value:"dateOfBirth"},{text:"Lớp",align:"start",value:"room"},{text:"Đánh giá trung bình",align:"start",value:"votes"},{text:"Số lần trực nhật",align:"start",value:"works"}]}},async created(){await this.getAllUser()},methods:{getVoteColor(t){return"Đang chờ"===t?"orange":"green"},getStatusColor(t){return"Đã hoàn thành"===t?"green":"orange"},async getAllUser(){try{this.loading=!0;const t=await(0,s.Y8)();this.userData=t.data.map(o.yj),this.rangeUserData=this.userData}catch(t){console.log(t)}finally{this.loading=!1}}}},l=i,u=a(1001),g=(0,u.Z)(l,n,r,!1,null,null,null),d=g.exports}}]);
//# sourceMappingURL=935.a836182c.js.map