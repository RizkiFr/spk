import fs from 'fs'
import { kultur_tanah, jumlah_kamar, luas_parkiran, spek_bangunan, design } from '../data/data.js'

const style = [
    [1 / 1, 1 / 4, 4 / 1, 1 / 6],
    [4 / 1, 1 / 1, 4 / 1, 1 / 4],
    [1 / 4, 1 / 4, 1 / 1, 1 / 5],
    [6 / 1, 4 / 1, 5 / 1, 1 / 1]
]

const kehandalan = [
    [1 / 1, 2 / 1, 5 / 1, 1 / 1],
    [1 / 2, 1 / 1, 3 / 1, 2 / 1],
    [1 / 5, 1 / 3, 1 / 1, 1 / 4],
    [1 / 1, 1 / 2, 4 / 1, 1 / 1]
]

const fuel = [0.3010, 0.2390, 0.2120, 0.2480]

const multiplyMatrices = (m1, m2) => {
    const result = [];
    for (let i = 0; i < m1.length; i++) {
        result[i] = [];
        for (let j = 0; j < m2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum, 4;
        }
    }
    return result;
}
const multiplyFinal = (m1, m2) => {
    const result = [];
    m1.forEach((v, i) => {
        let sum = 0
        v.forEach((el, idx) => {
            sum += el * m2[idx]
        })
        result.push(sum)
    });
    return result;
}

const countEigenvector = (matrix) => {
    return matrix.map(arr => {
        return arr.reduce((total, num) => total + num)
    })
}

const sumArray = (a) => {
    return a.reduce((total, num) => total + num)
}

const calculateEigenvector = (matrix) => {

    const result = multiplyMatrices(matrix, matrix)
    const eigenvector = countEigenvector(result)
    const total = sumArray(eigenvector)
    const normalitation = eigenvector.map(v => v / total)
    return normalitation
}

const indexOfMax = (arr) => {
    const maxValue = []
    const newArr = [...arr]
    for (let i = 0; i < 2; i++) {
        const valueMax = Math.max(...newArr)
        maxValue.push(arr.indexOf(valueMax))
        newArr.splice(arr.indexOf(valueMax), 1)
    }

    return maxValue;
}

export const calculate = (req, res) => {
    const currentData = JSON.parse(fs.readFileSync('./data.json'))

    const lahan_kamar = req.body.lahan_kamar
    const lahan_parkiran = req.body.lahan_parkiran
    const lahan_spek = req.body.lahan_spek
    const kamar_parkiran = req.body.kamar_parkiran
    const kamar_spek = req.body.kamar_parkiran
    const parkiran_spek = req.body.kamar_parkiran
    const kamar_lahan = lahan_kamar.split('/').reverse().join('/')
    const parkiran_lahan = lahan_parkiran.split('/').reverse().join('/')
    const spek_lahan = lahan_spek.split('/').reverse().join('/')
    const parkiran_kamar = kamar_parkiran.split('/').reverse().join('/')
    const spek_kamar = kamar_spek.split('/').reverse().join('/')
    const spek_parkiran = parkiran_spek.split('/').reverse().join('/')

    // const matrix = Array(4).fill(Array(4))
    const matrix = [
        [1 / 1, eval(lahan_kamar), eval(lahan_parkiran), eval(lahan_spek)],
        [eval(kamar_lahan), 1 / 1, eval(kamar_parkiran), eval(kamar_spek)],
        [eval(parkiran_lahan), eval(parkiran_kamar), 1 / 1, eval(parkiran_spek)],
        [eval(spek_lahan), eval(spek_kamar), eval(spek_parkiran), 1 / 1],
    ]
    const normalitation = calculateEigenvector(matrix)
    const kulturTanah = calculateEigenvector(kultur_tanah)
    const jumlahKamar = calculateEigenvector(jumlah_kamar)
    const luasParkiran = calculateEigenvector(luas_parkiran)
    const spekBangunan = calculateEigenvector(spek_bangunan)

    console.table(normalitation)
    console.table(kulturTanah)
    console.table(jumlahKamar)
    console.table(luasParkiran)
    console.table(spekBangunan)

    const car = [
        [kulturTanah[0], jumlahKamar[0], luasParkiran[0], spekBangunan[0]],
        [kulturTanah[1], jumlahKamar[1], luasParkiran[1], spekBangunan[1]],
        [kulturTanah[2], jumlahKamar[2], luasParkiran[2], spekBangunan[2]],
        [kulturTanah[3], jumlahKamar[3], luasParkiran[3], spekBangunan[3]],
        [kulturTanah[4], jumlahKamar[4], luasParkiran[4], spekBangunan[4]],
        [kulturTanah[5], jumlahKamar[5], luasParkiran[5], spekBangunan[5]],
        [kulturTanah[6], jumlahKamar[6], luasParkiran[6], spekBangunan[6]],
        [kulturTanah[7], jumlahKamar[7], luasParkiran[7], spekBangunan[7]],
    ]
    const final = multiplyFinal(car, normalitation)
    const finalIndex = indexOfMax(final)
    const responseData = {
        name: '',
        first_recomendation: design[finalIndex[0]],
        second_recomendation: design[finalIndex[1]]
    }
    fs.writeFile('./data.json', JSON.stringify([responseData, ...currentData]), err => {
        console.log({ err })
    });
    return res.status(200).json({ result: responseData })
}

export const getHistory = (req, res) => {
    const result = JSON.parse(fs.readFileSync('./data.json'))
    return res.status(200).json({ result })
}