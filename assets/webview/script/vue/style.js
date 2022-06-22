export default function(...styles) {
  styles.push(`
    .reset-style {
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      background: transparent;
    }
  `)
  styles = styles.join('\n')
  
  const style = document.createElement('style')
  style.innerHTML = styles
  document.head.append(style)
}