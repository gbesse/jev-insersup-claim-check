const FIELDS=['cohort','population','horizon','measure','unit'];
export function compareClaimScope(claim,official){
 const fail=()=>{throw new TypeError('FR: Comparaison invalide. / EN: Invalid comparison. / ES: Comparación inválida.');};
 if(!claim||!official||typeof claim!=='object'||typeof official!=='object'||Array.isArray(claim)||Array.isArray(official))fail();
 const missing=[],mismatches=[];
 for(const k of FIELDS){const a=claim[k],b=official[k];if(typeof a!=='string'||!a.trim()||typeof b!=='string'||!b.trim())missing.push(k);else if(a!==b)mismatches.push(k);}
 const numeric=Number.isFinite(claim.value)&&Number.isFinite(official.value);
 return {comparable:!missing.length&&!mismatches.length,missing,mismatches,numeric,exactMatch:numeric&&!missing.length&&!mismatches.length&&claim.value===official.value,percentagePointDelta:numeric&&claim.unit==='percent'&&official.unit==='percent'?claim.value-official.value:null};
}
