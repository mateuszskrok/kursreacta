import { getMinutesAndSecondsFromDurationInSeconds } from "../lib/time"

describe("getMinutesAndSecondsFromDurationInSeconds", () => {
    test("returns 30 seconds for 30 seconds duration", ()=>{
        expect( 
            getMinutesAndSecondsFromDurationInSeconds(30)[1]
            ).toEqual(30)
    })

    test("returns 0 mins for 30 seconds duration", ()=>{
        expect( 
            getMinutesAndSecondsFromDurationInSeconds(30)[0]
            ).toEqual(0)
    })
    test("returns 3 minutes 10 seconds for 190 seconds duration", ()=>{
        expect( 
            getMinutesAndSecondsFromDurationInSeconds(190)
            ).toEqual([3,10])
    })
})