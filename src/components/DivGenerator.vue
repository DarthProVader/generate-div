<template>
  <!-- Main container for the form and generated div -->
  <div class="flex flex-col items-center justify-center my-14 md:mx-0 mx-5">
    <form
      class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      @submit.prevent="generateDivFromInputs"
    >
      <h1 class="text-3xl font-medium mb-6 text-center text-teal-600">
        Generate div element
      </h1>
      <div class="mb-4">
        <input
          v-model="height"
          placeholder="Height"
          type="number"
          required
          class="bg-gray-200 p-2 rounded-lg w-3/4 shadow-md"
        />
        <select
          v-model="heightUnit"
          required
          class="bg-gray-200 p-2 rounded-lg w-1/4 shadow-md"
        >
          <option value="px">px</option>
          <option value="%">%</option>
        </select>
      </div>
      <div class="mb-4">
        <input
          v-model="width"
          placeholder="Width"
          type="number"
          required
          class="bg-gray-200 p-2 rounded-lg w-3/4 shadow-md"
        />
        <select
          v-model="widthUnit"
          required
          class="bg-gray-200 p-2 rounded-lg w-1/4 shadow-md"
        >
          <option value="px">px</option>
          <option value="%">%</option>
        </select>
      </div>
      <div class="mb-4">
        <input
          v-model="textLabel"
          placeholder="Optional text (max 10 words, text color is white)"
          maxlength="150"
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
        />
      </div>
      <div class="mb-4 flex">
        <span class="ml-1 mr-5">Pick a background color:</span>
        <input type="color" v-model="color" />
      </div>
      <div class="flex items-center justify-center">
        <button
          class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 sm:px-6 sm:py-2.5 text-center text-md px-4 font-medium py-2 rounded-3xl"
          type="submit"
        >
          Generate
        </button>
      </div>
    </form>
  </div>
  <!-- Container for the generated div -->
  <div
    id="generated"
    class="flex items-center justify-center my-14 md:mx-0 mx-5"
  >
    <div v-if="generatedCSS" :style="generatedCSS">
      {{ trimmedTextLabel }}
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, ref } from "vue";
import axios from "axios";
import { CSSProperties } from "vue";

export default {
  name: "DivGenerator",
  setup() {
    // Reactive references for user inputs and generated styles
    const height = ref("");
    const heightUnit = ref("px");
    const width = ref("");
    const widthUnit = ref("px");
    const color = ref("#000000");
    const textLabel = ref("");
    const trimmedTextLabel = ref("");
    const generatedCSS: Ref<CSSProperties> = ref({
      height: "",
      width: "",
      backgroundColor: "#000000",
      color: "#fff",
      alignItems: "center",
      textAlign: "center",
      fontSize: "16px",
      justifyContent: "center",
      display: "flex",
      overflow: "hidden",
      wordWrap: "break-word",
    });

    // Function to validate user inputs
    const validateInputs = (): boolean => {
      if (
        isNaN(Number(height.value)) ||
        isNaN(Number(width.value)) ||
        Number(height.value) < 0 ||
        Number(width.value) < 0
      ) {
        alert("Height and Width should be positive numbers.");
        return false;
      }

      return true;
    };

    // Function to handle div generation
    const generateDivFromInputs = async () => {
      if (!validateInputs()) {
        return;
      }

      const payload = {
        height: `${height.value}${heightUnit.value}`,
        width: `${width.value}${widthUnit.value}`,
        color: color.value,
        textLabel: textLabel.value,
      };

      try {
        const { data } = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          payload
        );

        // Check if the expected properties are present in the API response
        if (data.height && data.width && data.color) {
          // Update the generated styles based on the API response
          generatedCSS.value.height = data.height;
          generatedCSS.value.width = data.width;
          generatedCSS.value.backgroundColor = data.color;
          if (data.textLabel) {
            trimmedTextLabel.value = data.textLabel
              .split(" ")
              .slice(0, 10)
              .join(" ");
          }

          // Calculate the font size based on the dimensions
          const numericHeight = parseFloat(data.height);
          const numericWidth = parseFloat(data.width);
          const fontSizeFraction = Math.min(numericHeight, numericWidth) * 0.1;

          const unit =
            heightUnit.value === "px" || widthUnit.value === "px" ? "px" : "vw";

          generatedCSS.value.fontSize = `clamp(6px, ${fontSizeFraction}${unit}, 36px)`;
        } else {
          alert(
            "The received data is missing some properties. Please try again later."
          );
        }
      } catch (error) {
        console.log(error);
        alert("Something went wrong. Please try again.");
      }
    };

    return {
      height,
      heightUnit,
      width,
      widthUnit,
      color,
      textLabel,
      trimmedTextLabel,
      generatedCSS,
      generateDivFromInputs,
    };
  },
};
</script>
