"use strict";(self["webpackChunkwork"]=self["webpackChunkwork"]||[]).push([[971],{38971:function(t,e,n){n.r(e),n.d(e,{default:function(){return v}});var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.data?n("v-card",[n("v-card-title",[t._v(" Bảng phân công trực nhật tuần "+t._s(t.weekNumber)+" ("+t._s(t.weekStart)+" - "+t._s(t.weekEnd)+")")]),n("v-data-table",{staticClass:"elevation-1",attrs:{"item-key":"id",items:t.works,headers:t.headers,loading:t.loading,"loading-text":"Đang tải dữ liệu bảng trực nhật...","hide-default-footer":""},scopedSlots:t._u([{key:"item.votes",fn:function(e){var r=e.item;return[n("v-chip",{attrs:{color:t.getVoteColor(r.isWorkNotOpening),dark:""}},[t._v(" "+t._s(r.isWorkNotOpening?r.votes:"Đang chờ")+" ")])]}},{key:"item.isWorkNotOpening",fn:function(e){var r=e.item;return[n("v-chip",{attrs:{color:t.getStatusColor(r.isWorkNotOpening),dark:""}},[t._v(" "+t._s(r.isWorkNotOpening?"Đã hoàn thành":"Chưa hoàn thành")+" ")])]}}])})],1):n("h1",[t._v("Không có dữ liệu tuần này!")])],1)},o=[],a=n(67906),i=n(16198),s=(n(69600),n(74916),n(23123),n(81428)),u=n(96838),l=n(91709),c={name:"DashBoardPage",data:function(){return{data:!0,loading:!1,works:[],weekStart:(0,l.To)()[0],weekEnd:(0,l.To)()[1],weekNumber:(0,l.s)(),headers:[{text:"Thứ",align:"start",value:"day"},{text:"Ngày trực nhật",align:"start",value:"date"},{text:"Học sinh",align:"start",value:"users"},{text:"Ghi chú",align:"start",value:"description"},{text:"Giờ mở đánh giá",align:"start",value:"expires"},{text:"Đánh giá",align:"start",value:"votes"},{text:"Trạng thái",align:"start",value:"isWorkNotOpening"}]}},filters:{date:function(t){return t.split("-").reverse().join("/")}},created:function(){var t=this;return(0,i.Z)((0,a.Z)().mark((function e(){return(0,a.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getAllWorks();case 2:case"end":return e.stop()}}),e)})))()},methods:{getVoteColor:function(t){return t?"green":"orange"},getStatusColor:function(t){return t?"green":"orange"},getAllWorks:function(){var t=this;return(0,i.Z)((0,a.Z)().mark((function e(){var n,r;return(0,a.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,t.loading=!0,e.next=4,(0,s.ib)();case 4:n=e.sent,console.log(n),r=n.data,console.log(r),t.works=(0,u.cE)(r),console.log(t.works),e.next=15;break;case 12:e.prev=12,e.t0=e["catch"](0),console.log(e.t0);case 15:return e.prev=15,t.loading=!1,e.finish(15);case 18:case"end":return e.stop()}}),e,null,[[0,12,15,18]])})))()}}},g=c,d=n(1001),h=(0,d.Z)(g,r,o,!1,null,null,null),v=h.exports},81428:function(t,e,n){n.d(e,{Js:function(){return i},UU:function(){return o},ib:function(){return a}});var r=n(25972);function o(t){return(0,r.Z)({url:"/v1/works",method:"post",data:t})}function a(){return(0,r.Z)({url:"/v1/works",method:"get"})}function i(t){return(0,r.Z)({url:"/v1/works/".concat(t),method:"delete"})}}}]);
//# sourceMappingURL=971-legacy.32f8177e.js.map