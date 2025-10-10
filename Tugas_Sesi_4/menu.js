import { kalkulator } from './rumus.js';
import readline from 'readline';

const inputUser = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mulaiKalkulator() {
    inputUser.question('Masukkan angka pertama: ', angka1 => {
        inputUser.question('Masukkan angka kedua: ', angka2 => {
            inputUser.question('Masukkan operator (+, -, *, /): ', operator => {
                console.log(
                    `Hasil: ${kalkulator(
                        parseFloat(angka1),
                        parseFloat(angka2),
                        operator
                    )}`
                );

                // Tanya lagi?
                inputUser.question('Mau hitung lagi? (y/n): ', jawaban => {
                    if (jawaban.toLowerCase() === 'y') {
                        mulaiKalkulator(); // rekursif panggil ulang
                    } else {
                        console.log('Keluar dari kalkulator.');
                        inputUser.close();
                    }
                });
            });
        });
    });
}

mulaiKalkulator();
