export default {
  // ... تنظیمات دیگه‌ات
  plugins: ['vitest-globals'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:vitest-globals/recommended', // این خط مهمه
  ],
  rules: {
    // قوانین دلخواه خودت
  },
};
