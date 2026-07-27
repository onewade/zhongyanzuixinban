
<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
const ageModalVisible = ref(true)
const confirmBtnRef = ref(null)
const denyBtnRef = ref(null)
const currentFocus = ref('confirm') // 记录当前焦点

const confirmEnter = () => {
  ageModalVisible.value = false
}
const denyEnter = () => {
  alert('您未满18岁，无法进入本网站')
}

// 设置焦点
const setFocusToConfirm = () => {
  currentFocus.value = 'confirm'
  confirmBtnRef.value?.focus()
}

const setFocusToDeny = () => {
  currentFocus.value = 'deny'
  denyBtnRef.value?.focus()
}

// 处理弹窗内的键盘事件
const handleKeydown = (e) => {
  if (!ageModalVisible.value) return
  
  // Tab 键只在两个按钮之间切换
  if (e.key === 'Tab') {
    e.preventDefault()
    if (currentFocus.value === 'confirm') {
      setFocusToDeny()
    } else {
      setFocusToConfirm()
    }
    return
  }
  
  // 左右方向键切换
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault()
    if (currentFocus.value === 'confirm') {
      setFocusToDeny()
    } else {
      setFocusToConfirm()
    }
    return
  }
  
  // 上下方向键切换
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault()
    if (currentFocus.value === 'confirm') {
      setFocusToDeny()
    } else {
      setFocusToConfirm()
    }
    return
  }
  
  // Enter 键触发当前按钮
  if (e.key === 'Enter') {
    e.preventDefault()
    if (currentFocus.value === 'confirm') {
      confirmEnter()
    } else {
      denyEnter()
    }
    return
  }
}

onMounted(() => {
  // 弹窗打开时，聚焦到确认按钮
  nextTick(() => {
    setFocusToConfirm()
  })
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div v-if="ageModalVisible" class="age-modal">
    <div class="age-modal-content">
      <div class="age-modal-title">
        <div>本人年满18岁声明</div>
        <div><div>Declaration of Being Aged 18 or Above</div>
      </div>
      </div>
      
      <div class="age-modal-desc">
        根据香港法律，不得在业务过程中，向未成年人售卖或供应烟。<br>
        <span style="font-size:0.95rem;color:#666;">
          In accordance with the laws of the HKSAR, the sale and supply of tobacco products to persons under the age of 18 in the course of business is prohibited by law.
        </span>
      </div>
      <div class="age-modal-actions">
        <button ref="denyBtnRef" class="age-btn deny" @click="denyEnter" tabindex="0">否，未满18岁<br>No, I am not 18 or above.</button>
        <button ref="confirmBtnRef" class="age-btn confirm" @click="confirmEnter" tabindex="0">确认进入<br>Enter</button>
      </div>
    </div>
  </div>
  <RouterView/>
</template>

<style scoped lang="scss">
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
  transition: background 0.2s, box-shadow 0.2s;
}
.age-btn.deny {
  background: #eee;
  color: #c9082c;
}
.age-btn.confirm {
  background: #F7B334;
  color: #1f1f1f;
}
.age-btn:hover {
  opacity: 0.85;
}
.age-btn:focus {
  outline: 3px solid #F7B334;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(247, 179, 52, 0.3);
}
</style>
