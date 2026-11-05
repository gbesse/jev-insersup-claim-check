import test from 'node:test';import assert from 'node:assert/strict';import {compareClaimScope} from '../src/index.mjs';
const a={cohort:'2024',population:'graduates',horizon:'18months',measure:'employment',unit:'percent',value:82};
test('same number with different cohort is not exact',()=>{const x=compareClaimScope(a,{...a,cohort:'2023'});assert.equal(x.exactMatch,false);assert.deepEqual(x.mismatches,['cohort']);});
test('missing denominator context remains unknown',()=>{const x=compareClaimScope(a,{value:82});assert.equal(x.comparable,false);assert.equal(x.missing.length,5);});
test('matching scope permits numerical comparison',()=>assert.equal(compareClaimScope(a,{...a}).exactMatch,true));
