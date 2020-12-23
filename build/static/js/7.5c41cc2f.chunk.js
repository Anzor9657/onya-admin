(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[7],{683:function(e,t,a){"use strict";var n=a(9),r=a(0),i=a.n(r),l=a(691),o=(a(693),i.a.forwardRef((function(e,t){var a=i.a.cloneElement(e.children,{style:Object(n.a)(Object(n.a)({},e.children.style),{},{visibility:"hidden"})});return i.a.createElement(l.VelocityComponent,Object.assign({ref:t},e),a)})));o.defaultProps={animation:"transition.fadeIn",runOnMount:!0,targetQuerySelector:null,interruptBehavior:"stop",visibility:"visible",duration:300,delay:50,easing:[.4,0,.2,1],display:null,setRef:void 0},t.a=i.a.memo(o)},685:function(e,t,a){"use strict";var n=a(683);a.d(t,"a",(function(){return n.a}))},687:function(e,t,a){"use strict";a.d(t,"c",(function(){return u})),a.d(t,"b",(function(){return m})),a.d(t,"d",(function(){return b}));var n,r=a(43),i=a(24),l=a.n(i),o=a(48),c=a(22),s=a(56),d=a.n(s),u=Object(c.b)("users/getUsers",function(){var e=Object(o.a)(l.a.mark((function e(t){var a,n,r,i,o,c;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.page,n=t.perPage,r=t.search,e.next=3,d.a.post("",{operationName:"adminGetAllUsers",variables:{page:a,perPage:n,search:r},query:"\n\t\t\tquery\n\t\t\t\tadminGetAllUsers($page: Int, $perPage: Int, $search: String) {\n\t\t\t\t\tadminGetAllUsers(page: $page, perPage: $perPage, filters: {search: $search}) {\n\t\t\t\t\t\tpaginatorInfo { currentPage perPage total }\n\t\t\t\t\t\tdata { id name last_name email avatar created_at company_name company_abn company_web_site }\n\t\t\t\t\t}\n\t\t\t\t}"});case 3:return i=e.sent,e.next=6,i.data;case 6:return o=e.sent,c=o.data.adminGetAllUsers,e.abrupt("return",c);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),m=Object(c.b)("users/getUser",function(){var e=Object(o.a)(l.a.mark((function e(t){var a,n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.post("",{operationName:"adminGetUser",variables:{id:t},query:"query adminGetUser($id: Int!) {\n\t\t\t\tadminGetUser(id: $id) {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tlast_name\n\t\t\t\t\temail\n\t\t\t\t\tavatar\n\t\t\t\t\tcreated_at\n\t\t\t\t\tupdated_at\n\t\t\t\t\temail_verified_at\n\t\t\t\t\tskills { id name is_recommended }\n\t\t\t\t\ttrade { id title }\n\t\t\t\t\tposition_id \n\t\t\t\t\teducational_institution\n\t\t\t\t\tyear_of_experience\n\t\t\t\t\tlatitude\n\t\t\t\t\tlongitude\n\t\t\t\t\taddress\n\t\t\t\t\twork_radius\n\t\t\t\t\tcompany_name\n\t\t\t\t\tcompany_abn\n\t\t\t\t\tcompany_web_site\n\t\t\t\t\tprofile_filled\n\t\t\t\t\trole { id name }\n\t\t\t\t}\n\t\t\t}"});case 2:return a=e.sent,e.next=5,a.data;case 5:return n=e.sent,r=n.data.adminGetUser,e.abrupt("return",r);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),p=Object(c.d)({name:"users",initialState:{users:[],user:null,pagination:null},reducers:{setSearchText:function(e,t){e.search=t.payload}},extraReducers:(n={},Object(r.a)(n,u.fulfilled,(function(e,t){e.users=t.payload.data,e.pagination=t.payload.paginatorInfo})),Object(r.a)(n,m.fulfilled,(function(e,t){e.user=t.payload})),n)}),b=p.actions.setSearchText;t.a=p.reducer},689:function(e,t,a){"use strict";a.d(t,"a",(function(){return O}));var n=a(43),r=a(28),i=a(647),l=a(3),o=a(0),c=a.n(o),s=a(27),d=a(661),u=a(19),m=a(6);var p=function(e){var t=Object(s.a)(),a=Object(m.c)(Object(u.c)(t.palette.primary.main));return c.a.createElement("div",{className:e.classes.header},e.header&&c.a.createElement(d.a,{theme:a},e.header))},b=a(21),f=a(72),g=a(677),h=a(679);var v=function(e){var t=Object(s.a)(),a=Object(m.c)(Object(u.c)(t.palette.primary.main)),n=e.classes;return c.a.createElement(c.a.Fragment,null,e.header&&c.a.createElement(d.a,{theme:a},c.a.createElement("div",{className:Object(l.a)(n.sidebarHeader,e.variant)},e.header)),e.content&&c.a.createElement(r.a,{className:n.sidebarContent,enable:e.innerScroll},e.content))};var x=c.a.forwardRef((function(e,t){var a=Object(o.useState)(!1),n=Object(b.a)(a,2),r=n[0],i=n[1],s=e.classes;Object(o.useImperativeHandle)(t,(function(){return{toggleSidebar:d}}));var d=function(){i(!r)};return c.a.createElement(c.a.Fragment,null,c.a.createElement(g.a,{lgUp:"permanent"===e.variant},c.a.createElement(h.a,{variant:"temporary",anchor:e.position,open:r,onOpen:function(e){},onClose:function(e){return d()},disableSwipeToOpen:!0,classes:{root:Object(l.a)(s.sidebarWrapper,e.variant),paper:Object(l.a)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)},ModalProps:{keepMounted:!0},container:e.rootRef.current,BackdropProps:{classes:{root:s.backdrop}},style:{position:"absolute"}},c.a.createElement(v,e))),"permanent"===e.variant&&c.a.createElement(g.a,{mdDown:!0},c.a.createElement(f.a,{variant:"permanent",className:Object(l.a)(s.sidebarWrapper,e.variant),open:r,classes:{paper:Object(l.a)(s.sidebar,e.variant,"left"===e.position?s.leftSidebar:s.rightSidebar)}},c.a.createElement(v,e))))})),E=Object(i.a)((function(e){return{root:{display:"flex",flexDirection:"row",minHeight:"100%",position:"relative",flex:"1 0 auto",height:"auto",backgroundColor:e.palette.background.default},innerScroll:{flex:"1 1 auto",height:"100%"},topBg:{position:"absolute",left:0,right:0,top:0,height:200,background:"linear-gradient(to left, ".concat(e.palette.primary.dark," 0%, ").concat(e.palette.primary.main," 100%)"),backgroundSize:"cover",pointerEvents:"none"},contentWrapper:Object(n.a)({display:"flex",flexDirection:"column",padding:"0 3.2rem",flex:"1 1 100%",zIndex:2,maxWidth:"100%",minWidth:0,minHeight:0},e.breakpoints.down("xs"),{padding:"0 1.6rem"}),header:{height:136,minHeight:136,maxHeight:136,display:"flex",color:e.palette.primary.contrastText},headerSidebarToggleButton:{color:e.palette.primary.contrastText},contentCard:{display:"flex",flex:"1 1 100%",flexDirection:"column",backgroundColor:e.palette.background.paper,boxShadow:"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",minHeight:0,borderRadius:"8px 8px 0 0"},toolbar:{height:64,minHeight:64,display:"flex",alignItems:"center",borderBottom:"1px solid ".concat(e.palette.divider)},content:{flex:"1 1 auto",height:"100%",overflow:"auto","-webkit-overflow-scrolling":"touch"},sidebarWrapper:{position:"absolute",backgroundColor:"transparent",zIndex:5,overflow:"hidden","&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{zIndex:1,position:"relative"})},sidebar:{position:"absolute","&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent",position:"relative",border:"none",overflow:"hidden"}),width:240,height:"100%"},leftSidebar:{},rightSidebar:{},sidebarHeader:{height:200,minHeight:200,color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark,"&.permanent":Object(n.a)({},e.breakpoints.up("lg"),{backgroundColor:"transparent"})},sidebarContent:Object(n.a)({display:"flex",flex:"1 1 auto",flexDirection:"column",backgroundColor:e.palette.background.default,color:e.palette.text.primary},e.breakpoints.up("lg"),{overflow:"auto","-webkit-overflow-scrolling":"touch"}),backdrop:{position:"absolute"}}})),y=c.a.forwardRef((function(e,t){var a=Object(o.useRef)(null),n=Object(o.useRef)(null),i=Object(o.useRef)(null),s=E(e),d=e.rightSidebarHeader||e.rightSidebarContent,u=e.leftSidebarHeader||e.leftSidebarContent;return c.a.useImperativeHandle(t,(function(){return{rootRef:i,toggleLeftSidebar:function(){a.current.toggleSidebar()},toggleRightSidebar:function(){n.current.toggleSidebar()}}})),c.a.createElement("div",{className:Object(l.a)(s.root,e.innerScroll&&s.innerScroll),ref:i},c.a.createElement("div",{className:s.topBg}),c.a.createElement("div",{className:"flex container w-full"},u&&c.a.createElement(x,{position:"left",header:e.leftSidebarHeader,content:e.leftSidebarContent,variant:e.leftSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:s,ref:a,rootRef:i}),c.a.createElement("div",{className:Object(l.a)(s.contentWrapper,u&&(void 0===e.leftSidebarVariant||"permanent"===e.leftSidebarVariant)&&"lg:ltr:pl-0 lg:rtl:pr-0",d&&(void 0===e.rightSidebarVariant||"permanent"===e.rightSidebarVariant)&&"lg:pr-0")},c.a.createElement(p,{header:e.header,classes:s}),c.a.createElement("div",{className:Object(l.a)(s.contentCard,e.innerScroll&&"inner-scroll")},e.contentToolbar&&c.a.createElement("div",{className:s.toolbar},e.contentToolbar),e.content&&c.a.createElement(r.a,{className:s.content,enable:e.innerScroll,scrollToTopOnRouteChange:e.innerScroll},e.content))),d&&c.a.createElement(x,{position:"right",header:e.rightSidebarHeader,content:e.rightSidebarContent,variant:e.rightSidebarVariant||"permanent",innerScroll:e.innerScroll,classes:s,ref:n,rootRef:i})))}));y.defaultProps={};var O=c.a.memo(y)},777:function(e,t,a){"use strict";a.r(t);var n=a(689),r=a(248),i=a(0),l=a.n(i),o=a(687),c=a(21),s=a(685),d=a(649),u=a(651),m=a(146),p=a(661),b=a(147),f=a(19),g=a(6);var h=function(e){var t=Object(g.b)(),a=Object(g.c)(f.e),n=Object(i.useState)(""),r=Object(c.a)(n,2),h=r[0],v=r[1];return Object(i.useEffect)((function(){t(Object(o.d)(h))}),[t,h]),l.a.createElement("div",{className:"flex flex-1 w-full items-center justify-between"},l.a.createElement("div",{className:"flex items-center"},l.a.createElement(s.a,{animation:"transition.expandIn",delay:300},l.a.createElement(d.a,{className:"text-32"},"people")),l.a.createElement(s.a,{animation:"transition.slideLeftIn",delay:300},l.a.createElement(b.a,{className:"hidden sm:flex mx-0 sm:mx-12",variant:"h6"},"Users"))),l.a.createElement("div",{className:"flex flex-1 items-center justify-center px-12"},l.a.createElement(p.a,{theme:a},l.a.createElement(s.a,{animation:"transition.slideDownIn",delay:300},l.a.createElement(m.a,{className:"flex items-center w-full max-w-512 px-8 py-4 rounded-8 shadow"},l.a.createElement(d.a,{color:"action"},"search"),l.a.createElement(u.a,{placeholder:"Search",className:"flex flex-1 mx-8",disableUnderline:!0,fullWidth:!0,inputProps:{"aria-label":"Search"},value:h,onChange:function(e){var t=e.target;return v(t.value)}}))))))},v=a(28),x=a(767),E=a(768),y=a(766),O=a(778),j=a(765),S=a(26),w=a(202),k=a.n(w),N=a(647),P=a(249),C=a(683),_=a(764),I=[{id:"id",align:"left",disablePadding:!0,label:"ID",sort:!1},{id:"name",align:"left",disablePadding:!1,label:"Name",sort:!1},{id:"email",align:"left",disablePadding:!1,label:"Email",sort:!1},{id:"company",align:"left",disablePadding:!1,label:"Company",sort:!1},{id:"companyWebSite",align:"left",disablePadding:!1,label:"Company web site",sort:!1},{id:"regDate",align:"left",disablePadding:!1,label:"Register date",sort:!1}];var R=function(e){return l.a.createElement(_.a,null,l.a.createElement(j.a,{className:"h-64"},I.map((function(e){return l.a.createElement(y.a,{className:"p-4 md:p-16",key:e.id,align:e.align,padding:e.disablePadding?"none":"default"},e.label)}))))},H=Object(N.a)({avatar:{width:"50px",height:"50px",borderRadius:"50%",display:"inline-block",marginRight:"10px"}});var T=Object(S.i)((function(e){var t=Object(g.b)(),a=H(),n=Object(g.c)((function(e){return e.users})),r=n.users,s=n.pagination,d=n.search,u=Object(i.useState)(!0),m=Object(c.a)(u,2),p=m[0],f=m[1],h=Object(i.useState)(r),S=Object(c.a)(h,2),w=S[0],N=S[1],_=Object(i.useState)(1),I=Object(c.a)(_,2),T=I[0],U=I[1],D=Object(i.useState)(10),W=Object(c.a)(D,2),B=W[0],G=W[1],$=Object(i.useCallback)((function(){f(!0),t(Object(o.c)({page:T,perPage:B,search:d})).then((function(){return f(!1)}))}),[t,T,B,d]);return Object(i.useEffect)((function(){$()}),[t,$]),Object(i.useEffect)((function(){N(r)}),[t,r]),p?l.a.createElement(P.a,null):0===w.length?l.a.createElement(C.a,{delay:100},l.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full"},l.a.createElement(b.a,{color:"textSecondary",variant:"h5"},"There are no users!"))):l.a.createElement("div",{className:"w-full flex flex-col"},l.a.createElement(v.a,{className:"flex-grow overflow-x-auto"},l.a.createElement(x.a,{stickyHeader:!0,className:"min-w-xl","aria-labelledby":"tableTitle"},l.a.createElement(R,{rowCount:w.length}),l.a.createElement(E.a,null,w.map((function(t){return l.a.createElement(j.a,{className:"h-64 cursor-pointer",hover:!0,tabIndex:-1,key:t.id,onClick:function(){return a=t.id,void e.history.push("/users/".concat(a));var a}},l.a.createElement(y.a,{className:"p-4 md:p-16",component:"th",scope:"row"},t.id),l.a.createElement(y.a,{className:"p-4 md:p-16",component:"th",scope:"row"},t.avatar&&l.a.createElement("img",{className:a.avatar,src:t.avatar,alt:"avatar"}),t.name,t.last_name),l.a.createElement(y.a,{className:"p-4 md:p-16",component:"th",scope:"row"},t.email),l.a.createElement(y.a,{className:"p-4 md:p-16",component:"th",scope:"row"},t.company_name),l.a.createElement(y.a,{className:"p-4 md:p-16",component:"th",scope:"row"},t.company_web_site),l.a.createElement(y.a,{className:"p-4 md:p-16",component:"th",scope:"row"},k()(t.created_at).local().format("DD.MM.YYYY")))}))))),l.a.createElement(O.a,{className:"flex-shrink-0 border-t-1",component:"div",count:s.total,rowsPerPage:s.perPage,page:s.currentPage,onChangePage:function(e,t){U(t)},onChangeRowsPerPage:function(e){G(e.target.value)},backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"}}))}));t.default=Object(r.a)("users",o.a)((function(){return l.a.createElement(n.a,{classes:{content:"flex",contentCard:"overflow-hidden",header:"min-h-72 h-72 sm:h-136 sm:min-h-136"},header:l.a.createElement(h,null),content:l.a.createElement(T,null),innerScroll:!0})}))}}]);