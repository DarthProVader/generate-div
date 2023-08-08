import { mount } from "@vue/test-utils";
import DivGenerator from "@/components/DivGenerator.vue";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("DivGenerator", () => {
  beforeEach(() => {
    // Mock the alert function
    window.alert = jest.fn();
  });

  it("renders the form", () => {
    const wrapper = mount(DivGenerator);
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input[type='number']").exists()).toBe(true);
    expect(wrapper.find("input[type='color']").exists()).toBe(true);
    expect(wrapper.find("select").exists()).toBe(true);
    expect(wrapper.find("button[type='submit']").exists()).toBe(true);
  });

  it("generates a div when Generate button is clicked", async () => {
    const mockedResponse = {
      data: {
        height: "100px",
        width: "200px",
        color: "#FF0000",
        textLabel: "Sample Text",
      },
    };
    // Setup axios to return a mocked response
    mockedAxios.post.mockResolvedValue(mockedResponse);

    const wrapper = mount(DivGenerator);

    // Set input values
    await wrapper.find("input[placeholder='Height']").setValue("100");
    await wrapper.find("input[placeholder='Width']").setValue("200");
    await wrapper.find("input[type='color']").setValue("#FF0000");
    await wrapper.find("select").setValue("Sample Text");

    await wrapper.find("form").trigger("submit.prevent");

    // Ensure that Vue's nextTick (re-render) occurs before assertions
    await wrapper.vm.$nextTick();

    // Assert that a div is generated
    expect(wrapper.find("#generated").exists()).toBe(true);
    expect(wrapper.find("#generated div").attributes().style).toBe(
      "background-color: rgb(255, 0, 0); color: rgb(255, 255, 255); align-items: center; text-align: center; font-size: 16px; justify-content: center; display: flex; overflow: hidden; word-wrap: break-word; height: 100px; width: 200px;"
    );
    expect(wrapper.find("#generated div").text()).toBe("Sample Text");
  });

  it("validates inputs", async () => {
    const wrapper = mount(DivGenerator);

    // Set invalid input values (negative numbers)
    await wrapper.find("input[placeholder='Height']").setValue("-100");
    await wrapper.find("input[placeholder='Width']").setValue("-200");

    // Submit the form
    await wrapper.find("form").trigger("submit.prevent");

    // Assert that an alert is displayed
    expect(window.alert).toHaveBeenCalledWith(
      "Height and Width should be positive numbers."
    );
  });

  it("handles API error", async () => {
    // Mock axios to reject the promise
    (axios.post as jest.Mock).mockRejectedValue(new Error("API Error"));

    const wrapper = mount(DivGenerator);

    // Set input values
    await wrapper.find("input[placeholder='Height']").setValue("100");
    await wrapper.find("input[placeholder='Width']").setValue("200");

    // Submit the form
    await wrapper.find("form").trigger("submit.prevent");

    // Assert that an error message is displayed
    expect(window.alert).toHaveBeenCalledWith(
      "Something went wrong. Please try again."
    );
  });
});
