import{_ as H,m as J,a0 as K,u as Q,a3 as W,r,b as t,o as u,c as _,w as o,e,d as y,g as f,M as X,N as Y,O as Z,f as i,t as ee,E as c,a2 as oe,l as le,p as te,i as ae}from"./index.04828e1d.js";import{A as b}from"./index.4ed55dab.js";import"./axios.91e25212.js";const ne=p=>(te("data-v-2d52b569"),p=p(),ae(),p),se={class:"flex flex-row justify-between"},de=ne(()=>y("div",{class:"font-bold"},"\u7F16\u8F91\u9910\u70B9",-1)),re={class:"w-[350px] flex flex-row items-center"},ue={__name:"EditFoodInfo",setup(p){const k=J(),w=K("baseURL"),h=Q(),F=W(),l=r({id:"",food_name:"",price:0,cid:"",food_desc:"",food_img:"",weight:0}),E={food_name:[{required:!0,message:"\u8BF7\u8F93\u5165\u9910\u70B9\u540D\u79F0",trigger:"blur"}],price:[{required:!0,message:"\u4EF7\u683C\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}],cid:[{required:!0,message:"\u8BF7\u9009\u62E9\u9910\u70B9\u5206\u7C7B",trigger:"blur"}],food_desc:[{required:!0,message:"\u8BF7\u8F93\u5165\u9910\u70B9\u7684\u63CF\u8FF0\u4FE1\u606F",trigger:"blur"}],food_img:[{required:!0,message:"\u8BF7\u9009\u62E9\u9910\u70B9\u56FE\u7247",trigger:"blur"}],weight:[{required:!0,message:"\u8BF7\u8BBE\u7F6E\u9910\u70B9\u7684\u6743\u91CD",trigger:"blur"}]},m=r(!1);(()=>{m.value=!0;let n=F.params.id;b.foodInfo.findById(n).then(a=>{l.value=a}).finally(()=>{m.value=!1})})();const I=r([]);b.categoryInfo.getAllList().then(n=>I.value=n);const U=n=>{if(/^image\/(jpe?g|png|webp|gif|bmp)$/.test(n.type)){if(n.size/1024/1024>5)return c({type:"error",title:"\u9519\u8BEF",message:"\u56FE\u7247\u7684\u5927\u5C0F\u4E0D\u80FD\u5927\u4E8E5M"}),!1}else return c({type:"error",title:"\u9519\u8BEF",message:"\u8BF7\u9009\u62E9\u56FE\u7247\u6587\u4EF6\uFF0C\u56FE\u7247\u683C\u5F0F\u5FC5\u987B\u662Fjpg,jpeg,png,webp,gif,bmp\u683C\u5F0F"}),!1},B=n=>{l.value.food_img=n.data},g=r(null),L=()=>{g.value.validate(n=>{n?S():c({type:"warning",title:"\u63D0\u793A",message:"\u8BF7\u6B63\u786E\u7684\u586B\u5199\u8868\u5355\u7684\u5185\u5BB9"})})},v=r(!1),S=()=>{v.value=!0,b.foodInfo.update(l.value).then(n=>{c({type:"success",title:"\u4FEE\u6539\u6210\u529F",message:"\u9910\u70B9\u4FE1\u606F\u4FEE\u6539\u6210\u529F"}),h.replace({name:"FoodInfoList"})}).catch(n=>{c({type:"success",title:"\u4FEE\u6539\u5931\u8D25",message:"\u8BF7\u91CD\u8BD5\u6216\u8054\u7CFB\u7BA1\u7406\u5458"})}).finally(()=>{v.value=!1})},j=()=>{g.value.resetFields()};return(n,a)=>{const q=t("el-link"),x=t("el-input"),d=t("el-form-item"),C=t("el-input-number"),N=t("el-option"),R=t("el-select"),A=t("el-image"),D=t("el-icon"),$=t("el-upload"),z=t("el-slider"),M=t("el-tag"),V=t("el-button"),O=t("el-form"),P=t("el-skeleton"),T=t("el-card"),G=t("page-view");return u(),_(G,null,{default:o(()=>[e(T,null,{header:o(()=>[y("div",se,[de,e(q,{type:"primary",onClick:a[0]||(a[0]=s=>n.$router.back())},{default:o(()=>[f("\u8FD4\u56DE\u5217\u8868")]),_:1})])]),default:o(()=>[e(P,{rows:6,animated:"",loading:m.value},{default:o(()=>[e(O,{"label-width":"120px",model:l.value,rules:E,ref_key:"formEl",ref:g},{default:o(()=>[e(d,{label:"\u9910\u70B9\u540D\u79F0",prop:"food_name"},{default:o(()=>[e(x,{placeholder:"\u8BF7\u8F93\u5165\u9910\u70B9\u540D\u79F0",modelValue:l.value.food_name,"onUpdate:modelValue":a[1]||(a[1]=s=>l.value.food_name=s)},null,8,["modelValue"])]),_:1}),e(d,{label:"\u9910\u70B9\u4EF7\u683C",prop:"price"},{default:o(()=>[e(C,{min:0,modelValue:l.value.price,"onUpdate:modelValue":a[2]||(a[2]=s=>l.value.price=s)},null,8,["modelValue"])]),_:1}),e(d,{label:"\u9910\u70B9\u5206\u7C7B",prop:"cid"},{default:o(()=>[e(R,{placeholder:"\u8BF7\u9009\u62E9\u9910\u70B9\u5206\u7C7B",class:"w-full",modelValue:l.value.cid,"onUpdate:modelValue":a[3]||(a[3]=s=>l.value.cid=s)},{default:o(()=>[(u(!0),X(Z,null,Y(I.value,s=>(u(),_(N,{key:s.id,value:s.id,label:s.category_name},null,8,["value","label"]))),128))]),_:1},8,["modelValue"])]),_:1}),e(d,{label:"\u9910\u70B9\u56FE\u7247",prop:"food_img"},{default:o(()=>[e($,{action:i(w)+"/foodInfo/uploadFoodImg",headers:{softeem_ele_admin_token:i(k).token},name:"food_img",class:"w-[200px] h-[200px] border border-dashed border-gray-400 flex flex-row justify-center items-center","before-upload":U,"show-file-list":!1,"on-success":B},{default:o(()=>[l.value.food_img?(u(),_(A,{key:0,src:i(w)+l.value.food_img,fit:"contain",class:"w-full h-full"},null,8,["src"])):(u(),_(D,{key:1,size:"65px",color:"#808080"},{default:o(()=>[e(i(oe))]),_:1}))]),_:1},8,["action","headers"])]),_:1}),e(d,{label:"\u9910\u70B9\u63CF\u8FF0",prop:"food_desc"},{default:o(()=>[e(x,{placeholder:"\u8BF7\u8F93\u5165\u9910\u70B9\u63CF\u8FF0\u4FE1\u606F",type:"textarea",rows:5,modelValue:l.value.food_desc,"onUpdate:modelValue":a[4]||(a[4]=s=>l.value.food_desc=s)},null,8,["modelValue"])]),_:1}),e(d,{label:"\u9910\u70B9\u6743\u91CD",prop:"weight"},{default:o(()=>[y("div",re,[e(z,{modelValue:l.value.weight,"onUpdate:modelValue":a[5]||(a[5]=s=>l.value.weight=s),min:0,max:100,step:.1},null,8,["modelValue","step"]),e(M,{class:"w-[30px] ml-10"},{default:o(()=>[f(ee(l.value.weight),1)]),_:1})])]),_:1}),e(d,null,{default:o(()=>[e(V,{type:"primary",onClick:L,loading:v.value,"loading-icon":i(le)},{default:o(()=>[f(" \u4FDD\u5B58\u6570\u636E ")]),_:1},8,["loading","loading-icon"]),e(V,{type:"danger",onClick:j},{default:o(()=>[f("\u91CD\u7F6E\u8868\u5355")]),_:1})]),_:1})]),_:1},8,["model"])]),_:1},8,["loading"])]),_:1})]),_:1})}}},fe=H(ue,[["__scopeId","data-v-2d52b569"]]);export{fe as default};