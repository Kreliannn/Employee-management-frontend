

export const getCurrentMonth = () => {
    const monthName = new Date().toLocaleString('default', { month: 'long' });
    return monthName.toString()
}