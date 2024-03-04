import { Resource as FhirResource } from '@medplum/fhirtypes';
import { MerkleMapFactory, Verification, Backend, Query as ZkQuery, IPLD } from '@ozkarjs/zerkle';
// Add Activity Definitions here.

export type RawQueryObject = {
  [key: string]: ComparisonObject;
};

export type ComparisonOperator = '$eq' | '$gt' | '$ge' | '$lt' | '$le' | '$ne';

type ComparisonObject = {
  [key in ComparisonOperator]?: string | number;
};

export type ProofRequest = {
  query: RawQueryObject;
  resource: FhirResource;
};

export async function computeFhirProof(proofRequest: ProofRequest): Promise<any> {
  //console.log(IPLD.LinearModel.fromJS(proofRequest));
  const map = MerkleMapFactory.fromLinearModel(IPLD.LinearModel.fromJS(proofRequest.resource));
  // // Incoming public stuff
  const q = ZkQuery.parse(proofRequest.query);

  console.time('compile');
  const backend = await Backend.compile();
  console.timeEnd('compile');

  console.time('execute.0');
  const proofE = await backend.proveQuery(q).run(map);
  console.timeEnd('execute.0');
  console.log(
    'p.0',
    proofE.publicOutput.trace.toString(),
    proofE.publicOutput.isSatisfied.toString(),
    proofE.publicInput.given.toString(),
    proofE.publicInput.root.toString()
  );

  console.time('execute.1');
  const proof = await backend.execute(map, q);
  const verification = await Verification.check(q, proof);
  console.timeEnd('execute.1');
  console.log('a', proof, verification);
  console.log('q', q);
  console.log(map);
  return proof;
}
