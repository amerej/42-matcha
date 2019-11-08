export default {
  props: {
    label: {
      type: String,
      required: true
    },
    model: {
      type: Array,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      value: this.model
    };
  },
  watch: {
    model(model) {
      this.value = model;
    }
  },
  methods: {
    onChange() {
      this.$emit("update:model", this.value);
    }
  }
};
