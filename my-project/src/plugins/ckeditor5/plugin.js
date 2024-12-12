module.exports = {
  ckeditor: {
    enabled: true,
    config: {
      toolbar: [
        'heading', '|',
        'bold', 'italic', 'underline', '|',
        'fontFamily', 'fontSize', '|', // Thêm fontFamily và fontSize vào thanh toolbar chính
        'link', 'blockQuote', '|',
        'undo', 'redo'
      ],
      fontFamily: {
        options: [
          'default',
          'Arial, Helvetica, sans-serif',
          'Courier New, Courier, monospace',
          'Georgia, serif',
          'Times New Roman, Times, serif',
          'Verdana, Geneva, sans-serif'
        ],
        supportAllValues: true // Cho phép tất cả giá trị font chữ được thêm tùy chỉnh
      },
      fontSize: {
        options: [9, 10, 11, 12, 14, 16, 18, 20, 24, 28], // Các kích cỡ font tùy chọn
        supportAllValues: true // Cho phép người dùng nhập kích cỡ tùy chỉnh
      },
      image: {
        toolbar: [
          'imageTextAlternative', 'imageStyle:inline', 'imageStyle:block', '|',
          'imageAlign:left', 'imageAlign:center', 'imageAlign:right'
        ]
      }
    }
  }
};
