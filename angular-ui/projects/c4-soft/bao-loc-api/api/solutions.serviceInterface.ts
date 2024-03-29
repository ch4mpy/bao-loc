/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { SolutionResponse } from '../model/models';
import { SolutionUpdateRequest } from '../model/models';


import { BaoLocConfiguration }                                     from '../configuration';



export interface SolutionsApiInterface {
    defaultHeaders: HttpHeaders;
    configuration: BaoLocConfiguration;

    /**
     * Add a solution to current user collection
     * 
     * @param solutionUpdateRequest 
     */
    createSolution(solutionUpdateRequest: SolutionUpdateRequest, extraHttpRequestParams?: any): Observable<object>;

    /**
     * Delete a specific solution. User must own this solution or have BAOLOC_ADMIN role.
     * 
     * @param solutionId 
     */
    deleteSolution(solutionId: number, extraHttpRequestParams?: any): Observable<object>;

    /**
     * Retrieve solutions for current user
     * 
     */
    retrievePlayerSolutions(extraHttpRequestParams?: any): Observable<Array<SolutionResponse>>;

    /**
     * Retrive a specific solution. User must own this solution or have BAOLOC_ADMIN role.
     * 
     * @param solutionId 
     */
    retrieveSolution(solutionId: number, extraHttpRequestParams?: any): Observable<SolutionResponse>;

    /**
     * Update a specific solution. User must own this solution or have BAOLOC_ADMIN role.
     * 
     * @param solutionId 
     * @param solutionUpdateRequest 
     */
    updateSolution(solutionId: number, solutionUpdateRequest: SolutionUpdateRequest, extraHttpRequestParams?: any): Observable<object>;

}
