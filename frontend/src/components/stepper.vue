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
  margin-bottom: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.step-wrapper {
  display: flex;
  align-items: center;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: clamp(30px, 5vw, 50px);
}

.circle {
  margin-top: 0.5rem;
  width: clamp(25px, 3vw, 40px);
  height: clamp(25px, 3vw, 40px);
  border-radius: 50%;
  background: var(--card);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.75rem, 1.5vw, 2rem);
  font-weight: bold;
  transition: 0.3s;
}

.circle.active {
  background: var(--principal-light);
  color: var(--texto-light);
}

.circle.done {
  background: #06b83b;
  color: var(--texto-light);
}

.label {
  margin-top: 0.1rem;
  margin-bottom: 0;
  font-size: clamp(0.3rem, 0.8vw, 0.75rem);
  text-align: center;
  max-width: 80px;
}

.line {
  width: clamp(20px, 2.5vw, 40px);
  height: 4px;
  background: var(--card);
  margin: 0 clamp(1px, 0.8vw, 6px);
  transition: 0.3s;
}

.lineDone {
  background: #0db13e;
}
@media (max-width: 768px) {
  .label {
    display: none;
  }
  .line {
    width: 30px;
    margin: 0;
  }

  .circle {
    margin-top: 0;
  }
}

@media (max-width: 576px) {
  .label {
    display: none;
  }
  .stepper {
    gap: 0.5rem;
  }
  .line {
    display: none;
  }
}
</style>
