const VALOR_ATTACK = 10;
const VALOR_ATTACK_MONSTRO = 14;
const VALOR_STRONG_ATTACK = 27;
const VALOR_RECUPERA=20
//====================================================
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const EVENT_GAME_OVER = 'GAME_OVER';
// ===================================================

let registoLog = [];

function valor_vida(){
    let vida = prompt('Digita o numero de vida: ');
    if(isNaN(parseInt(vida)) ){
        throw{erro: 'Invalido! , valor digitado não é um numero'}
    }
    else if(parseInt(vida) <= 0){
        throw{erro: 'Invalido! , O numero nao pode ser menor ou igual a zero'}
    }
    return parseInt(vida);
}
let maxVida;
try{
    maxVida = valor_vida()
}catch (erro){
    console.log(erro);
    alert('Invalido! Atualiza a pagina e digita novamete');
}


let valorActualMonstro = maxVida;
let valorActualPlayer = maxVida;


adjustHealthBars(maxVida);

function writeToLog(evento, valor, vidaMonstro, vidaPlayer) {

    let entradaRegisto = {};

    switch (evento) {
        case EVENT_PLAYER_ATTACK:
            entradaRegisto = {
                evento: evento,
                valor: valor,
                alvo: 'MONSTER',
                valorFinalVidaMonstro: vidaMonstro,
                valorFinalVidaPlayer: vidaPlayer,
            };
            break;
        case EVENT_PLAYER_STRONG_ATTACK:
            entradaRegisto = {
                evento: evento,
                valor: valor,
                alvo: 'MONSTER',
                valorFinalVidaMonstro: vidaMonstro,
                valorFinalVidaPlayer: vidaPlayer,
            };
            break;
        case EVENT_MONSTER_ATTACK:
            entradaRegisto = {
                evento: evento,
                valor: valor,
                alvo: 'PLAYER',
                valorFinalVidaMonstro: vidaMonstro,
                valorFinalVidaPlayer: vidaPlayer,
            };
            break;
        case EVENT_PLAYER_HEAL:
            entradaRegisto = {
                evento: evento,
                valor: valor,
                alvo: 'PLAYER',
                valorFinalVidaMonstro: vidaMonstro,
                valorFinalVidaPlayer: vidaPlayer,
            };
            break;
        case EVENT_GAME_OVER:
            entradaRegisto = {
                evento: evento,
                valor: valor,
                valorFinalVidaMonstro: vidaMonstro,
                valorFinalVidaPlayer: vidaPlayer,
            };
            break;
        default:
            entradaRegisto = {};
        }
        registoLog.push(entradaRegisto);
 }


function resultado() {
	valorActualMonstro = maxVida;
	valorActualPlayer = maxVida;
	resetGame(maxVida);
}

function terminalRound(){
    const perdaDoJogador = dealPlayerDamage(VALOR_ATTACK_MONSTRO);
    valorActualPlayer -= perdaDoJogador;
   
    if(valorActualMonstro <= 0 &&  valorActualPlayer >0){
        alert('Venceu! ');
        writeToLog(EVENT_GAME_OVER,'JOGADOR VENCEU',valorActualMonstro,valorActualPlayer);
    }
    else if(valorActualPlayer <= 0 && valorActualMonstro > 0){
        alert('Perdeu! ');
        writeToLog(EVENT_GAME_OVER,'JOGADOR PERDEU',valorActualMonstro,valorActualPlayer);
    }
    else if(valorActualPlayer <= 0 && valorActualMonstro <=0){
        alert('Empate! ');
        writeToLog(EVENT_GAME_OVER,'JOGO EMPATADO',valorActualMonstro,valorActualPlayer);
    }
    if (valorActualMonstro <= 0 || valorActualPlayer <= 0) {
		resultado();
	}
}

// function attackHandler(){
//     const perda = dealMonsterDamage(VALOR_ATTACK);
//     valorActualMonstro -= perda;
//     const perdaDoJogador = dealPlayerDamage(VALOR_ATTACK_MONSTRO);
//     valorActualPlayer -= perdaDoJogador;

//     terminalRound()
// }

function attackMonster(mode){
    
    let evento;
    let perdaMaxima;
    if(mode === MODE_ATTACK){
        perdaMaxima = VALOR_ATTACK;
        evento= EVENT_PLAYER_ATTACK;
    }
    else if(mode === MODE_STRONG_ATTACK){
        perdaMaxima = VALOR_STRONG_ATTACK;
        evento=EVENT_PLAYER_STRONG_ATTACK;
    }

    const perda = dealMonsterDamage(perdaMaxima);
    valorActualMonstro -= perda;
    writeToLog(evento,perda,valorActualMonstro,valorActualPlayer)
    terminalRound();
   
}

function attackHandler(){
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler(){
    attackMonster(MODE_STRONG_ATTACK);
}


function healHandler(){

    increasePlayerHealth(VALOR_RECUPERA);
    valorActualPlayer += VALOR_RECUPERA;
    if(valorActualPlayer >= maxVida){
        alert('Não pode fazer mais heal');
    }
    writeToLog(EVENT_PLAYER_HEAL,VALOR_RECUPERA,valorActualMonstro,valorActualPlayer)
    terminalRound();
}

function showLog(){
    for(const show_log of registoLog){
        console.log(show_log);
        for (const key in show_log) {
            console.log(`${key} ==> ${show_log[key]}`);
        }
    }
}


attackBtn.addEventListener('click',attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healHandler);
logBtn.addEventListener('click', showLog);
