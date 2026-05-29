<template>
  <div class="stepper">
    <div v-for="(step, index) in steps" :key="index" class="step-wrapper">
      <div class="step">
        <div
          class="circle"
          :class="{
            active: currentStep === index + 1,
            done: currentStep > index + 1,
          }"
        >
          {{ index + 1 }}
        </div>

        <p class="label">
          {{ step }}
        </p>
      </div>

      <div
        v-if="index !== steps.length - 1"
        class="line"
        :class="{
          lineDone: currentStep > index + 1,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentStep: Number,
  steps: Array,
});
</script>

<style scoped>
.stepper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.step-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
}

.circle {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: 0.3s;
}

.circle.active {
  background: #0d6efd;
  color: white;
}

.circle.done {
  background: #198754;
  color: white;
}

.label {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
}

.line {
  flex: 1;
  height: 4px;
  background: #ddd;
  margin: 0 10px;
  margin-bottom: 25px;
  transition: 0.3s;
}

.lineDone {
  background: #198754;
}
</style>
