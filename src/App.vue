
<script setup>
import {reactive, onMounted, ref} from 'vue'
const ageModalVisible = ref(true);
const confirmEnter = () => {
  ageModalVisible.value = false;
};
const denyEnter = () => {
  // window.location.href = 'https://www.gov.hk/tc/theme/psi/';
  alert('您未满18岁，无法进入本网站');
};
// 接受 对象类型 数据的参数传入并返回一个响应式的对象
const state = reactive({
    count:0
})
// 简单类型
const count =ref(0)
const setCount = ()=>{
  state.count++
  console.log(state);
}
const addcount =()=>{
  count.value++
  console.log(count);
}
</script>

<template>
  <div v-if="ageModalVisible" class="age-modal">
    <div class="age-modal-content">
      <div class="age-modal-title">本人年满18岁声明</div>
      <div class="age-modal-desc">
        根据香港法律，不得在业务过程中，向未成年人售卖或供应烟。<br>
        <span style="font-size:0.95rem;color:#666;">
          Under the law of Hong Kong, tobacco must not be sold or supplied to a minor in the course of business.
        </span>
      </div>
      <div class="age-modal-actions">
        <button class="age-btn deny" @click="denyEnter">否，未满18岁<br>No, I'm under 18.</button>
        <button class="age-btn confirm" @click="confirmEnter">确认进入<br>Confirm</button>
      </div>
    </div>
  </div>
  <RouterView/>
</template>
<style lang="scss" scoped>
.test{
  // color: $priceColor;
}
</style>
<style scoped>
.age-modal {
  position: fixed;
  z-index: 99999;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
}
.age-modal-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  padding: 2.5rem 2rem 2rem;
  max-width: 350px;
  width: 90%;
  text-align: center;
}
.age-modal-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  color: #c9082c;
}
.age-modal-desc {
  font-size: 1.05rem;
  margin-bottom: 2rem;
  color: #333;
}
.age-modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
}
.age-btn {
  flex: 1;
  padding: 0.7rem 0.2rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.age-btn.deny {
  background: #eee;
  color: #c9082c;
}
.age-btn.confirm {
  background: #F7B334;
  color: #fff;
}
.age-btn:hover {
  opacity: 0.85;
}
</style>